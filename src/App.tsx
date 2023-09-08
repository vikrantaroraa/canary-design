import ExampleTabs from "src/components/example-components/TabsTypeAExample";
import "./App.css";
import { ExampleTabsTypeB } from "src/components/example-components/TabsTypeBExample";
import { MultiStepForm } from "src/components/MultiStepForm";
import { FormExample } from "src/components/example-components/FormExample";

function App() {
  return (
    <>
      <ExampleTabs />
      <ExampleTabsTypeB />
      <MultiStepForm />
      <FormExample />
    </>
  );
}

export default App;
