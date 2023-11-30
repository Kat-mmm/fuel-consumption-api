function FuelConsumptionManager(){
    return{
        currentRoute: 'allVehicles', 
        allVehicles: [],
        newVehicle: {
            description: '',
            regNumber: ''
        },
        refuelVehicle: {
            vehicleId : 0, 
            liters : 0, 
            amount : 0, 
            distance :  0, 
            filledUp : false
        },
        responseMessage: '',
        getVehicles() {
            axios.get("/api/vehicles")
                .then((result) => {
                    //Set the vehicles list
                    this.allVehicles = result.data.data;
                })
                
                .catch((error) => {
                    console.error("Error fetching vehicles:", error);
                });
        },
        addVehicle() {
            axios.post("/api/vehicle", this.newVehicle)
                .then((result) => {

                    //set the responseMessage to give context on errors
                    this.responseMessage = result.data.message

                    //remove the message after 4s
                    setTimeout(() => {
                        this.responseMessage = '';
                    } , 4000)

                    this.getVehicles();
                })
                .catch((error) => {
                    console.error("Error adding vehicle:", error);
                });
        },
        refuelCar() {
            axios.post("/api/vehicle", this.refuelVehicle)
                .then((result) => {

                    this.getVehicles();
                })
                .catch((error) => {
                    console.error("Error refueling vehicle:", error);
                });
        },
        setCurrentRoute(route) {
            this.currentRoute = route;
            localStorage.setItem('currentRoute', route);
        },
        init(){
            this.getVehicles();
            this.currentRoute = localStorage.getItem('currentRoute') || 'allVehicles';
        },
    }
}


document.addEventListener('alpine:init', () => {
    Alpine.data('fuelConsumption', FuelConsumptionManager);
});