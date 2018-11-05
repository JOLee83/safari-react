import React, { Component } from 'react';


class App extends Component {
  state = {
    SeenAnimals: []

  }
  componentDidMount() {
    fetch("https://localhost:5001/api/SeenAnimals")
      .then(response => response.json())
      .then(json => {
        this.setState({
          SeenAnimals: json
        })
      })
  }
  countAnimals = () => {
    let count = 0
    for (let i = 0; i < this.state.SeenAnimals.length; i++) {
      count = count + this.state.SeenAnimals[i].countOfTimesSeen
    }
    return count
  }
  countCertainAnimals = () => {
    let count = 0
    for (let i = 0; i < this.state.SeenAnimals.length; i++) {
      let animal = this.state.SeenAnimals[i].species
      if (animal === "Lion" || animal === "Zebra" || animal === "Elephant") {
        count = count + this.state.SeenAnimals[i].countOfTimesSeen
      }
    }
    return count
  }
  render() {
    return (
      <>
        <header>Safari Vacation</header>
        <main>
          <h1>All the Animals I saw</h1>
          <div>
            {this.state.SeenAnimals.map(Animals => {
              return (
                <section key={Animals.id}>
                  <h2>Species: {Animals.species}</h2>
                  <h2>Sightings: {Animals.countOfTimesSeen}</h2>
                  <h2>Location of Last Sighting: {Animals.locationOfLastSeen}</h2>
                </section>
              )
            })}
          </div>
          <h1>All Animals Seen In Field</h1>
          <div>

            {this.state.SeenAnimals.map(Animals => {
              if (Animals.locationOfLastSeen === "Field") {
                return (
                  <section key={Animals.id}>
                    <h2>Species: {Animals.species}</h2>
                    <h2>Sightings: {Animals.countOfTimesSeen}</h2>
                    <h2>Location of Last Sighting: {Animals.locationOfLastSeen}</h2>
                  </section>
                )
              }
            })}
          </div>
          <h1>All Animals Not Seen In Field</h1>
          <div>

            {this.state.SeenAnimals.map(Animals => {
              if (Animals.locationOfLastSeen !== "Field") {
                return (
                  <section key={Animals.id}>
                    <h2>Species: {Animals.species}</h2>
                    <h2>Sightings: {Animals.countOfTimesSeen}</h2>
                    <h2>Location of Last Sighting: {Animals.locationOfLastSeen}</h2>
                  </section>
                )
              }
            })}
          </div>
          <h1>Total Animal Sightings</h1>
          <aside>
            <h2>{this.countAnimals()}</h2>
          </aside>
          <h1>Total Sightings of Lions, Zebras, and Elephants</h1>
          <aside>
            <h2>{this.countCertainAnimals()}</h2>
          </aside>
        </main>
      </>
    );
  }
}

export default App;
