import React, { useState } from "react";
import {
  Button,
  InputGroup,
  RadioGroup,
  Radio,
  Navbar,
  Alignment,
  HTMLSelect
} from "@blueprintjs/core";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminDash() {
  const [name, setName] = useState([]);
  const [desc, setDesc] = useState([]);
  const [type, setType] = useState([]);
  const sub = () => {
    const val = {
      item_name: name,
      description: desc,
      item_type: type
    };
    axios.post("http://localhost:5000/item/", val).then(res => {
      console.log(val);
      console.log(res);
    });
  };
  return (
    <div>
      <Navbar fixedToTop={true} className="bp3-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>NITK NC</Navbar.Heading>
          <Navbar.Divider />
          <Link
            to={`/user`}
            style={{ textDecoration: "none", color: "#f5f8fa" }}
          >
            <Button className="bp3-minimal" icon="power" text="Logout" />
          </Link>
        </Navbar.Group>
      </Navbar>
      <form
        onSubmit={sub}
        style={{ margin: "10vh auto auto auto", width: "50%" }}
      >
        <label className="label">Item Name </label>
        <InputGroup
          className="inputField"
          placeholder="Enter name"
          name="price"
          onChange={e => setName(e.target.value)}
        />
        <InputGroup
          className="inputField"
          placeholder="Enter description"
          onChange={e => setDesc(e.target.value)}
        />
        <HTMLSelect name="item_select" onChange={e => setType(e.target.value)}>
          <option> Select Type</option>
          <option value="VEG">VEG</option>
          <option value="NON-VEG">NON-VEG</option>
        </HTMLSelect>

        <Button
          className="submitBtn bp3-intent-success"
          type="submit"
          value="Login"
          style={{ marginTop: "20px" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
