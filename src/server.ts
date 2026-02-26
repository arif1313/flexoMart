import { app } from './app';
import congfiq from './app/congfiq';
import mongoose from 'mongoose';
async function main() {
  try {
    await mongoose.connect(congfiq.DB_URL as string);

    app.listen(congfiq.Port, () => {
      console.log(`Example app listening on port ${congfiq.Port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
