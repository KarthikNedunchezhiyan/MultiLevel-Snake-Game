function __(id) {
    return (typeof id === typeof "")?document.getElementById(id):id;
}