export const encode = (body) => {
  const str = JSON.stringify(body);
  return Buffer.from(str).toString("base64");
};

export const decode = (str) => {
  const body = Buffer.from(str, "base64").toString("utf8");
  return JSON.parse(body);
};
