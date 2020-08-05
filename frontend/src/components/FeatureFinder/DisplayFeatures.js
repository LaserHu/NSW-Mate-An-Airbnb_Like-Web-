import React  from "react";
import { Drawer, Button, Icon, Skeleton } from "antd";
import PlaceCard from "./PlaceCard.js";

export default class DisplayFeatures extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          <Icon type="shop" /> {this.props.buttonLabel}
        </Button>
        <Drawer
          title={this.props.buttonLabel + " in " + this.props.location}
          width={"50%"}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <section className="col-12">
            <div className="d-flex flex-column justify-content-center">
              <div className="d-flex flex-wrap">
                {this.props.searchResults.map(result => {
                  /*console.log(result);*/
                  return <PlaceCard key={result.id} info={result} />;
                })}
                {this.props.searchResults.length === 0 && <Skeleton active />}
              </div>
            </div>
          </section>
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "right"
            }}
          >
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              Close
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}
