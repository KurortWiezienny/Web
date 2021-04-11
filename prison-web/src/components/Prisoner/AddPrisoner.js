import React, { Component } from "react";
import config from "../../config.json"
import GetAllCells from "../../fetchData/Cells/GetAllCells";

class AddPrisoner extends Component {
  state = {
    prisoner: {
      name: "",
      forname: "",
      pesel: "",
      address: "",
      pass: false,
      behavior: 1,
      isolated: false,
      idCell: null,
    },
    cells: [],
  };

  handleChange = (e) => {
    if (e.target.name === "behavior") {
      this.setState({
        prisoner: {
          ...this.state.prisoner,
          [e.target.name]: e.target.value * 1,
        }
      });
    } else {
      this.setState({
        prisoner: {
          ...this.state.prisoner,
          [e.target.name]: e.target.value,
        }
      });
    }
  };
  setCells = (cells) => {
    this.setState({
      cells
    })
  }
  componentDidMount = () => {
    GetAllCells(this.setCells)

  }

  handleButton = () => {
    const data = this.state.prisoner;
    console.log(JSON.stringify(data));
    fetch(config.SERVER_URL + "api/Prisoner", {
      method: "POST", // or 'PUT'

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.statusCode === 200) {
          alert("Dodano więźnia");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  handleCells = (e) => {
    this.setState(prevState => {
      let prisoner = { ...prevState.prisoner };
      prisoner.idCell = e.target.value * 1;
      return { prisoner }
    });

  }
  mapCells = () => {
    return (
      <div>
        <h3>Cela:</h3>
        <select name="cellName" onChange={this.handleCells}>
          <option value="" defaultValue hidden>Wybierz cele</option>
          {this.state.cells.map((cell) => (
            <option key={cell.id} value={cell.id}>
              {cell.cellType.cellName} {cell.occupiedBeds}/{cell.bedsCount}
            </option>

          ))}
        </select>
      </div>
    );

  }
  render() {


    return (
      <div className="loginBox">
        <h1 className="loginH1">Dodawanie nowego więźnia</h1>
        <input
          type="text"
          name="name"
          placeholder="Imię"
          value={this.state.prisoner.name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="Nazwisko"
          name="forname"
          value={this.state.prisoner.forname}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="pesel"
          placeholder="Pesel"
          value={this.state.prisoner.pesel}
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="Adres"
          name="address"
          value={this.state.prisoner.address}
          onChange={this.handleChange}
        />
        <h3>Zachowanie:</h3>
        <select name="behavior" onChange={this.handleChange}>
          <option key="1" value="1">
            1
          </option>
          <option key="2" value="2">
            2
          </option>
          <option key="3" value="3">
            3
          </option>
          <option key="4" value="4">
            4
          </option>
          <option key="5" value="5">
            5
          </option>
        </select>
        {this.mapCells()}
        <button className="loginButton" onClick={this.handleButton}>
          Dodaj więźnia
        </button>
      </div>
    );
  }
}

export default AddPrisoner;
