function convert() {
    const value = document.getElementById("degrees").value;
    const type = document.getElementById("type").value;
    const result = document.getElementById("result");

    if (value === "" || isNaN(value)) {
        result.textContent = "Invalid input";
        return;
    }

    let output = "";

    if (type === "fahrenheit") {
        output = ((value - 32) * 5/9).toFixed(4) + " °C";
    }
    else if (type === "celsius") {
        output = ((value * 9/5) + 32).toFixed(4) + " °F";
    }
    else if (type === "kelvin") {
        output = (value - 273.15).toFixed(4) + " °C";
    }

    result.textContent = output;
}