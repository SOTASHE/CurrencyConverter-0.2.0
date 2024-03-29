import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button, Card, Form, Col, Container, Row } from "react-bootstrap";
import "./converter.scss";

import converterService from "./../service";
import ChartView from "./../chart-view/chart-view";
import headerImage from "./../../assets/images/money.png";
import {
  CHART_COLOR,
  PREDICTION_CHART_COLOR,
  DEFAULT_NO_OF_WEEKS,
} from "./../../config";

function Converter(props) {
  const [fromCurrency, setFromCurrency] = useState(props.fromCurrency);
  const [toCurrency, setToCurrency] = useState(props.toCurrency);
  const [chartData, setChartData] = useState();
  const [predictionData, setPredictionData] = useState();
  const [weekNo, setWeekNo] = useState(DEFAULT_NO_OF_WEEKS);
  const [baseamount, setBaseamount] = useState();
  const [targetamount, setTargetamount] = useState();
  const [todayAmount, setTodayAmount] = useState();
  const [chartConfig, setChartConfig] = useState({ toCurrency: "" });
  const [validated, setValidated] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(true);
  const serviceInstance = new converterService();

  useEffect(() => {
    setInitialValues({});
  }, []);

  const onSelectChange = (event) => {
    resetInputFields();
    if (event.target.name === "from") {
      setFromCurrency(event.target.value);
    } else if (event.target.name === "to") {
      setToCurrency(event.target.value);
    }
  };

  const onAmountChange = (event) => {
    if (todayAmount) {
      if (event.target.name === "baseamount") {
        setTargetamount(
          (event.target.value * todayAmount.targetAmount).toFixed(3)
        );
      } else if (event.target.name === "targetamount") {
        setBaseamount(
          (event.target.value / todayAmount.targetAmount).toFixed(3)
        );
      }
    }
  };

  const setInitialValues = () => {
    props.showLoading(true);
    setChartProperties();
    serviceInstance
      .exhangeRequest({
        startDate: startDate(),
        todayDate: todayDate(),
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
      })
      .then((result) => result.json())
      .then((result) => {
        setInitialChartData(result);
      })
      .catch((error) => {
        props.showAlert(true);
        props.showAlertMessage(error);
        console.error("Error: ", error);
      });
  };

  const onConvertButtonClick = (event) => {
    props.showLoading(true);
    setChartProperties();
    setButtonEnable(true);
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
      serviceInstance
        .exhangeRequest({
          startDate: startDate(),
          todayDate: todayDate(),
          fromCurrency: fromCurrency,
          toCurrency: toCurrency,
        })
        .then((result) => result.json())
        .then((result) => {
          prepareData(result);
        })
        .catch((error) => {
          setButtonEnable(false);
          props.showLoading(false);
          props.showAlert(true);
          props.showAlertMessage(error);
          console.error("Error: ", error);
        });
    } else {
      setButtonEnable(false);
      props.showLoading(false);
    }
    setValidated(true);
  };

  const onWeekInputChange = (event) => {
    setWeekNo(event.target.value);
  };

  const prepareData = (result) => {
    if (result && result.rates) {
      const sortedData = getChartData(result.rates);
      var tempSortedArray = [...sortedData];
      reverseArrayWithCurrency(tempSortedArray);
      setChartData([...sortedData]);
      setPredictionData([...tempSortedArray]);
    } else {
      setButtonEnable(false);
      props.showLoading(false);
      props.showAlert(true);
      props.showAlertMessage(result);
      console.error("Error:: ", result);
    }
  };

  const setInitialChartData = (result) => {
    if (result && result.rates) {
      const sortedData = getChartData(result.rates);
      setChartData(sortedData);
    } else {
      setButtonEnable(false);
      console.error("Error: ", result);
      props.showLoading(false);
      props.showAlert(true);
      props.showAlertMessage(result);
    }
  };

  const getChartData = (data) => {
    const resultSet = data;
    let tempData = [];
    var subarr;
    Object.keys(resultSet).forEach((key) => {
      subarr = resultSet[key];
      Object.assign(subarr, { name: moment(key).format("DD-MM-YYYY") });
      tempData.push(subarr);
    });
    const sortedData = tempData
      .slice()
      .sort(
        (first, second) =>
          moment(first.name).format("DD-MM-YYYY") -
          moment(second.name).format("DD-MM-YYYY")
      );
    setInputAmounts(sortedData);
    props.showLoading(false);
    setButtonEnable(false);
    return sortedData;
  };
  const resetInputFields = () => {
    setTargetamount(null);
    setBaseamount(null);
    setTodayAmount(null);
  };

  const setInputAmounts = (chartData) => {
    const tempChartData = chartData;
    resetInputFields();
    setBaseamount(1);
    const latestDate = tempChartData
      .map(function (e) {
        return e.name;
      })
      .sort()
      .reverse()[0];
    Object.keys(tempChartData).forEach((key) => {
      const item = tempChartData[key];
      if (item["name"] === latestDate) {
        const targetAmount = item[toCurrency] / item[fromCurrency];
        setTargetamount(targetAmount.toFixed(3));
        setTodayAmount({
          baseAmount: 1,
          targetAmount: targetAmount.toFixed(3),
        });
      }
    });
  };

  const todayDate = () => {
    return moment().format("YYYY-MM-DD");
  };
  const startDate = () => {
    if (weekNo) {
      return moment().subtract(weekNo, "weeks").format("YYYY-MM-DD");
    }
  };

  const setChartProperties = () => {
    setChartConfig({ toCurrency: toCurrency });
  };

  const reverseArrayWithCurrency = (array) => {
    for (let i = 0, j = array.length - 1; i < j; i++, j--) {
      [array[i], array[j]] = [array[j], array[i]];
    }
    for (let i = 0; i <= array.length - 1; i++) {
      const randomNumber = Math.floor(Math.random() * 10 + 1);
      const futureDate = moment()
        .add(randomNumber, "days")
        .format("DD-MM-YYYY");
      array[i]["name"] = futureDate;
    }
  };

  return (
    <div className="rff-converter">
      <Card className="rff-formcontainer">
        <Card.Header as="h5">
          <span>Currency </span>Converter
          <span
            role="img"
            aria-label="money"
            style={{
              backgroundImage: `url(${headerImage})`,
            }}
            className="headerimage"
          ></span>
        </Card.Header>
        <Card.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={onConvertButtonClick}
            className="rff-convertform"
          >
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="converterForm.baseAmount">
                <Form.Control
                  type="text"
                  placeholder="Base amount"
                  name="baseamount"
                  className="rff-baseamount"
                  defaultValue={baseamount}
                  onChange={onAmountChange}
                />
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Control
                  as="select"
                  name="from"
                  className="rff-fromcurrency"
                  defaultValue={fromCurrency}
                  onChange={(event) => onSelectChange(event)}
                >
                  {Object.keys(props.listOption || {}).map((key) => (
                    <option key={key} value={key}>
                      {props.listOption[key]}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group
                as={Col}
                md="6"
                controlId="converterForm.targetAmount"
              >
                <Form.Control
                  type="text"
                  placeholder="Target amount"
                  name="targetamount"
                  className="rff-targetamount"
                  defaultValue={targetamount}
                  onChange={onAmountChange}
                />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationFormik01">
                <Form.Control
                  as="select"
                  name="to"
                  className="rff-tocurrency"
                  defaultValue={toCurrency}
                  onChange={(event) => onSelectChange(event)}
                >
                  {Object.keys(props.listOption || {}).map((key) => (
                    <option key={key} value={key}>
                      {props.listOption[key]}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="12">
                <Form.Control
                  type="number"
                  placeholder="Enter no of weeks"
                  className="rff-week"
                  value={weekNo}
                  min="1"
                  max="25"
                  onChange={(event) => onWeekInputChange(event)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Provide a number between 1 to 25.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Button
              type="submit"
              className="rff-submitbtn"
              disabled={buttonEnable}
            >
              Convert
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Container
        className={`rff-chartcontainer${
          !predictionData ? "single" : "sidebyside"
        }`}
      >
        <Row>
          {chartData && (
            <Col xs={6}>
              <div className="rff-chartview">
                <ChartView
                  header="Chart View"
                  renderData={chartData}
                  toCurrency={chartConfig.toCurrency}
                  areaColor={CHART_COLOR}
                />
              </div>
            </Col>
          )}
          {predictionData && (
            <Col xs={6}>
              <div className="rff-predictionview">
                <ChartView
                  header="Forecast View"
                  renderData={predictionData}
                  toCurrency={chartConfig.toCurrency}
                  areaColor={PREDICTION_CHART_COLOR}
                />
              </div>
            </Col>
          )}
        </Row>
        {!predictionData && !chartData && (
          <div className="rff-chartnodata">{"No chart available"}</div>
        )}
      </Container>
    </div>
  );
}

export default Converter;
