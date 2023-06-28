import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import "../Cards/Card.css";

function FunctionalCard() {
  const [key, setKey] = useState("home");
  const [result, setResult] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1010/api/cards");
        setData(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchToSearch = (value) => {
    fetch("http://localhost:1010/api/cards").then((response) =>
      response.json().then((json) => {
        const result = json.filter((card) => {
          return (
            value &&
            card &&
            card.card_type &&
            card.card_type.toLowerCase().includes(value)
          );
        });
        setResult(result);
        console.log(result);
      })
    );
  };
  const handleChange = (value) => {
    setSearchTerm(value);
    fetchToSearch(value);
  };

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
      style={{
        fontSize: "20px",
        color: "#CCCCCC",
        // backgroundColor: "black",
      }}
    >
      <Tab eventKey="All" title="All Cards">
        <Container fluid className="MainContainer">
          {data.map((card) => (
            <div class="card">
              <div class="card-content">
                <div className="card-details" key={card.name}>
                  <h3>
                    <p>Name: {card.name}</p>
                  </h3>

                  <p>Budget Name: {card.budget_name}</p>
                  <p>Owner ID: {card.owner_id}</p>
                  <p>
                    Spent: {card.spent.value} {card.spent.currency}
                  </p>
                  <p>
                    Available to Spend: {card.available_to_spend.value}{" "}
                    {card.available_to_spend.currency}
                  </p>
                  <p>Card Type: {card.card_type}</p>
                  {card.card_type === "burner" && <p>Expiry: {card.expiry}</p>}
                  {card.card_type === "subscription" && (
                    <p>Limit: {card.limit}</p>
                  )}
                  <p>Status: {card.status}</p>
                </div>
              </div>
            </div>
          ))}
        </Container>
      </Tab>
      <Tab eventKey="Subscription" title="Subscription">
        <Container fluid className="MainContainer">
          {data
            .filter((card) => card.card_type === "subscription") // Filter cards with card_type equal to "subscription"
            .map((card) => (
              <div class="card">
                <div class="card-content">
                  <div className="card-details" key={card.name}>
                    <h3>
                      <p>Name: {card.name}</p>
                    </h3>

                    <p>Budget Name: {card.budget_name}</p>
                    <p>Owner ID: {card.owner_id}</p>
                    <p>
                      Spent: {card.spent.value} {card.spent.currency}
                    </p>
                    <p>
                      Available to Spend: {card.available_to_spend.value}{" "}
                      {card.available_to_spend.currency}
                    </p>
                    <p>Card Type: {card.card_type}</p>
                    {card.card_type === "burner" && (
                      <p>Expiry: {card.expiry}</p>
                    )}
                    {card.card_type === "subscription" && (
                      <p>Limit: {card.limit}</p>
                    )}
                    <p>Status: {card.status}</p>
                  </div>
                </div>
              </div>
            ))}
        </Container>
      </Tab>
      <Tab eventKey="Burner" title="Burner">
        <Container fluid className="MainContainer">
          {data
            .filter((card) => card.card_type === "burner") // Filter cards with card_type equal to "subscription"
            .map((card) => (
              <div class="card">
                <div class="card-content">
                  <div className="card-details" key={card.name}>
                    <h3>
                      <p>Name: {card.name}</p>
                    </h3>

                    <p>Budget Name: {card.budget_name}</p>
                    <p>Owner ID: {card.owner_id}</p>
                    <p>
                      Spent: {card.spent.value} {card.spent.currency}
                    </p>
                    <p>
                      Available to Spend: {card.available_to_spend.value}{" "}
                      {card.available_to_spend.currency}
                    </p>
                    <p>Card Type: {card.card_type}</p>
                    {card.card_type === "burner" && (
                      <p>Expiry: {card.expiry}</p>
                    )}
                    {card.card_type === "subscription" && (
                      <p>Limit: {card.limit}</p>
                    )}
                    <p>Status: {card.status}</p>
                  </div>
                </div>
              </div>
            ))}
        </Container>
      </Tab>
    </Tabs>
  );
}

export default FunctionalCard;
