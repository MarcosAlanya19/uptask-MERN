import { generateId } from '../helpers/generateId.js';
import { generateJWT } from '../helpers/generateJWT.js';
import { User } from '../models/User.js';

export const register = async(req, res) => {
  // Evitar registros duplicados
  const { email } = req.body;
  const existUser = await User.findOne({ email }); /* Validacion de que el usuario ya existe */

  if (existUser) {
    const err = new Error('Usuario ya registrado');
    return res.status(400).json({ msg: err.message });
  }
  try {
    const user = new User(req.body);
    user.token = generateId();
    const userStorage = await user.save() /* Para guardar la data */
    res.json(userStorage);
  } catch (error) {
    console.error(error);
  }
}

export const autenticate = async (req, res) => {
  const { email, password } = req.body;
  // Comprobar si el usuario existe
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error('El usuario no existe')
    return res.status(404).json({ msg: err.message })
  };

  // Comprobar si el usuario esta confirmado
  if (!user.confirmado) {
    const err = new Error('La cuenta no ha sido confirmada')
    return res.status(403).json({ msg: err.message })
  };

  // Comprobar password
  if (await user.verifyPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id)
    })
  } else {
    const err = new Error('El password es incorrecto');
    return res.status(403).json({ msg: err.message });
  }
};

export const confirm = async(req, res) => {
  const { token } = req.params;
  const userConfirm = await User.findOne({ token });
  if (!userConfirm) {
    const err = new Error('Token no valido');
    return res.status(403).json({ msg: err.message });
  };

  try {
    userConfirm.confirmado = true;
    userConfirm.token = ''
    await userConfirm.save() /* Guardar en BD */
    res.json({msg: 'Usuario confirmado correctamente'})
  } catch (err) {
    console.error(err);
  }
  console.log(userConfirm);
}

export const forgetPassword = async(req, res) => {
  const { email } = req.body;
  const userConfirm = await User.findOne({ email });
  if (!userConfirm) {
    const err = new Error('El usuario no existe');
    return res.status(404).json({ msg: err.message });
  };
  try {
    userConfirm.token = generateId()
    await userConfirm.save();
    res.json({msg: 'Hemos enviado un email con las instrucciones'})
  } catch (error) {
    console.error(error);
  }
}

export const verifyToken = async(req, res) => {
  const { token } = req.params;

  const tokenValid = await User.findOne({ token });
  if (tokenValid) {
    res.json({ msg: 'Token valido y el usuario existe' })
  }else {
    const err = new Error('Token no valido');
    return res.status(404).json({ msg: err.message });
  };
};

export const newPassword = async(req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });
  if (user) {
    user.password = password;
    user.token = '';
    try {
      await user.save();
      res.json({ msg: 'Password modificado correctamente' });
    } catch (error) {
      console.error(error);
    }
  }else {
    const err = new Error('Token no valido');
    return res.status(404).json({ msg: err.message });
  };
};

export const profile = (req, res) => {
  const { user } = req;
  res.json(user);
};
