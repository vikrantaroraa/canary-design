import ExampleTabs from "src/components/example-components/TabsTypeAExample";
import "./App.css";
import { ExampleTabsTypeB } from "src/components/example-components/TabsTypeBExample";
import { MultiStepForm } from "src/components/MultiStepForm";

function App() {
  return (
    <>
      <ExampleTabs />
      <ExampleTabsTypeB />
      <MultiStepForm />
    </>
  );
}

export default App;
