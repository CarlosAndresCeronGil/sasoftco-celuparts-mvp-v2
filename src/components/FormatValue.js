import { NumericFormat } from "react-number-format";
import { Input } from "reactstrap";
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

function MyCustomNumberFormat(props) {
  const format = numStr => {
    if (numStr === "") return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(numStr);
  };

  return (
    <NumericFormat
      {...props}
      displayType="input"
      thousandSeparator=","
      prefix="$"
      format={format}
      isAllowed={values => {
        const { value } = values;
        return value.charAt(0) !== "0";
      }}
      customInput={Input}
    />
  );
}

export default MyCustomNumberFormat;
