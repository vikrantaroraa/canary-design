import ExampleTabs from "src/components/example-components/TabsTypeAExample";
import "./App.css";
import { ExampleTabsTypeB } from "src/components/example-components/TabsTypeBExample";
import { MultiStepForm } from "src/components/MultiStepForm";
import { FormExample } from "src/components/example-components/FormExample";
import { Button } from "src/components/Button";
import { ExampleSteps } from "src/components/Steps";

function App() {
  return (
    <>
      {/* <ExampleTabs />
      <ExampleTabsTypeB />
      <MultiStepForm /> */}
      {/* <FormExample /> */}
      <ExampleSteps />
      {/* <Button type="fill" onClick={() => console.log("hi")}>
        Hello
      </Button>
      <Button onClick={() => console.log("hi")}>Hello</Button> */}
    </>
  );
}

export default App;
