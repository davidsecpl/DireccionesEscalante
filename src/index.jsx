import AppNavigator from "./navigation/index";
import { init } from "./db";

init()
  .then(() => {
    console.log("Initialized database");
  })
  .catch((err) => {
    console.log("Initialized database failed");
    console.log(err);
  });

export default function App() {
  return (
    <AppNavigator />
  );
}
