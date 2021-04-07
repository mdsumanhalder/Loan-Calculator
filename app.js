// Listen for Submit
document.getElementById('loan-form').addEventListener('submit', function(e){

//Hide results
document.getElementById('results').style.display = 'none';

//Show loading
document.getElementById('loading').style.display = 'block';

setTimeout(calculateResult, 2000);

e.preventDefault();
});


// Calculate Results
function calculateResult(){

    // UI Elements
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');



    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    // Monthly Payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principal ).toFixed(2);

        //Show results
        document.getElementById('results').style.display = 'block';

        //Hide loading
        document.getElementById('loading').style.display = 'none';


    }else{
        showError('Please Check The Numbers');
    }
    

}

// Show Error
function showError(error){
    
//Hide results
document.getElementById('results').style.display = 'none';
//Hide loading
document.getElementById('loading').style.display = 'none';

// Create a Div
const errorDiv = document.createElement('div');
// Add Class
errorDiv.className = 'alert alert-danger';
// Create TextNode and append to div
errorDiv.appendChild(document.createTextNode(error));

const card =  document.querySelector('.card');
const heading =  document.querySelector('.heading');

card.insertBefore(errorDiv, heading);

// Clear Error after 3 Seconds
setTimeout(clearError, 3000);
}

// Clear Error
function clearError(){
    document.querySelector('.alert').remove();
}