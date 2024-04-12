import { Button, Input, InputWrapper } from "@mantine/core";
import { useState } from "react";
import "./index.scss";
import Layout from "../../layouts/Layout";

const CreateProduct = () => {
  const [step, setStep] = useState<number>(0);

  return (
    <Layout>
      <div className="createproduct">
        <div className="createproduct_form">
          {step === 0 ? (
            <>
              <span>Select a title for your product</span>
              <Input />
            </>
          ) : null}
        </div>
        <div className="createproduct_back">
          {step === 0 ? null : (
            <Button
              onClick={() => {
                if (step > 0) setStep((prevState) => prevState - 1);
              }}
            >
              Back
            </Button>
          )}
        </div>
        <div className="createproduct_next">
          <Button
            onClick={() => {
              if (step < 4) {
                setStep((prevState) => prevState + 1);
              }
            }}
          >
            {step === 4 ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
