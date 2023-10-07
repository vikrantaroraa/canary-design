import ExampleTabs from "src/components/example-components/TabsTypeAExample";
import "./App.css";
import { ExampleTabsTypeB } from "src/components/example-components/TabsTypeBExample";
import { MultiStepForm } from "src/components/MultiStepForm";
import { FormExample } from "src/components/example-components/FormExample";
import { Button } from "src/components/Button";
import { ExampleSteps } from "src/components/example-components/StepsExample";
import FileUploadExample from "src/components/example-components/FileUploadExample";
import ExampleCarouselTypeA from "src/components/example-components/CarouselTypeAExample";

function App() {
  return (
    <>
      {/* <ExampleTabs />
      <ExampleTabsTypeB />
      <MultiStepForm /> */}
      {/* <FormExample /> */}
      {/* <ExampleSteps /> */}
      <ExampleCarouselTypeA />
      {/* <FileUploadExample /> */}
      {/* <Button type="fill" onClick={() => console.log("hi")}>
        Hello
      </Button>
      <Button onClick={() => console.log("hi")}>Hello</Button> */}
    </>
  );
}

export default App;
