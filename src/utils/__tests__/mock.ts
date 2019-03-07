import { uploadImage } from "../cos";
import fs from "fs";

test("COS mock", async () => {
  const stream = fs.createReadStream("./support/files/avatar.jpg");
  const filename = 'avatar.jpg'
  const file = { stream, filename }
  const data = await uploadImage(file, 'Channel', '12345')
  expect(data["Location"]).toBe("dev.myqcloud.com/resource/1/image.jpg")
})