import ExampleTabs from "src/components/example-components/TabsTypeAExample";
import "./App.css";
import { ExampleTabsTypeB } from "src/components/example-components/TabsTypeBExample";
import { MultiStepForm } from "src/components/MultiStepForm";
import { FormExample } from "src/components/example-components/FormExample";
import Steps from "src/components/dummy-components/Steps";
import { Button } from "src/components/Button";

function App() {
  return (
    <>
      {/* <ExampleTabs />
      <ExampleTabsTypeB />
      <MultiStepForm />
      <FormExample /> */}
      {/* <Steps /> */}
      <Button type="fill" onClick={() => console.log("hi")}>
        Hello
      </Button>
      <Button onClick={() => console.log("hi")}>Hello</Button>
    </>
  );
}

export default App;
