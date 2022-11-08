import React from "react";
import Radio from "@mui/material/Radio";

const SwitchBanner = ({ setFeedFriends }) => {
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = event => {
    setSelectedValue(event.target.value);
    if (selectedValue === "a") {
      setFeedFriends(false);
    } else {
      setFeedFriends(true);
    }
  };
  return (
    <div>
      Friend's Posts
      <Radio
        checked={selectedValue === "a"}
        onChange={handleChange}
        value="a"
        name="radio-buttons"
        inputProps={{ "aria-label": "A" }}
      />
      All Posts
      <Radio
        checked={selectedValue === "b"}
        onChange={handleChange}
        value="b"
        name="radio-buttons"
        inputProps={{ "aria-label": "B" }}
      />
    </div>
  );
};

export default SwitchBanner;
