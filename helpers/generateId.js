export const generateId = () => {
  const ramdom = Math.random().toString(32).substring(2);
  const date = Date.now().toString(32);
  return ramdom + date
}
