const header = document.getElementsByClassName('header')[0];
const main = document.getElementsByClassName('main')[0];
const footer = document.getElementsByClassName('footer')[0];

const birthdayDate = document.getElementsByClassName('bday')[0];
const submitBtn = document.querySelector('.btn');
const loading = document.querySelector('.loading');
const output_text = document.querySelector('.output_text');
const checkBox = document.querySelector('input[type="checkbox"]')

const totalDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

checkBox.addEventListener('change',(e) => {
  
   if(e.target.checked) {
     header.style.background = '#A8A29E';
     main.style.background = '#A8A29E';
     footer.style.background = '#A8A29E'
   } else {
      header.style = '';
     main.style = '';
     footer.style= ''
   }
})

submitBtn.addEventListener('click', (e) => {

   if(birthdayDate.value.length == 0) {
      output_text.innerText = 'Please select your birthdate from the input tag..'
      return;
   }
   loading.style = "display:block";
   output_text.style.display = "none"
   setTimeout(()=> {
      
      extractDate(birthdayDate.value);
   },4000)
     
});


const extractDate = (date) => {
  
   const dateArr = date.split("-");
   const year = dateArr[0];
   const month = dateArr[1];
   const day = dateArr[2];
   
   const palinDromedate = checkDiffDateCombinations(day, month, year);
   if (palinDromedate) {

      loading.style = '';
      output_text.innerText = `Wohoo your birthdate(${palindDromedate}) is a palindrome date..`;

   } else {

      const [nearestPlaindromeDate, i] = findNearestPalindromeDate(day, month, year);
      loading.style = '';
      output_text.innerText = `Sorry your birthdate is not a palindrome date. The nearest date is ${nearestPlaindromeDate} and you have missed by ${i} days.`;
   }
}

const checkDiffDateCombinations = (day, month, year) => {

   const formatOne = day + month + year;
   const formatTwo = month + day + year.split("").slice(2, 4).join("");
   const formatThree = year + month + day;
   const formatFour = Number(month) + day + year;

   if (isPalindrome(formatOne)) {
      return `${day}-${month}-${year}`
   }
   else if (isPalindrome(formatTwo)) {
     
      return `${day}-${month}-${year.split("").slice(2, 4).join("")}`
   }
   else if (isPalindrome(formatThree)) {
      return `${year}-${month}-${day}`
   }
   else if (isPalindrome(formatFour)) {
      return `${Number(month)}-${day}-${year}`
   }
   else {
      return false;
   }

}

const isPalindrome = (date) => {

   let reversedDate = "";
   for (let i = date.length - 1; i >= 0; i--) {
      reversedDate += date[i]
   }

   if (date === reversedDate) {
      return true;
   } else {
      return false;
   }

}

const findNearestPalindromeDate = (day, month, year) => {

   let day1 = Number(day);
   let month1 = Number(month);
   let year1 = Number(year);

   let day2 = Number(day);
   let month2 = Number(month);
   let year2 = Number(year);


   for (let i = 1; i > 0; i++) {

      day1 = day1+1;
      // if days exceeds total days in month, reset day to 1 and add month with 1
      if (day1 > totalDaysInMonth[month1 - 1]) {
         day1 = 1;
         month1 += 1;
      }

      //if month is greater than 12, reset month to 1 and increase the year by 1
      if (month1 > 12) {
         month1 = 1;
         year1 += year1;
      }

      // convert day, month and year to strings
      let day1String = day1.toString();
      let month1String = month1.toString();
      let year1String = year1.toString();

      // add 0 in front if date is less than 10;
      if (day1 < 10) {
         day1String = "0" + day1String;
      } 
      if (month1 < 10) {
         month1String = "0" + month1String;
      } 

      const palindromeDate = checkDiffDateCombinations(day1String, month1String, year1String);

      if (palindromeDate) {
         return [palindromeDate, i];
      }
      
   }


}