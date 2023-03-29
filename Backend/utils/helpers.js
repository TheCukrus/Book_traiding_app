
// //Checking if ISBN is valid
// export const is_valid_ISBN = (isbn) =>
// {
//     // Remove hyphens and spaces from the ISBN
//     isbn = isbn.replace(/[- ]/g, '');

//     // Check if the ISBN has 10 or 13 digits
//     if (isbn.length !== 10 && isbn.length !== 13)
//     {
//         return false;
//     }

//     // Calculate the check digit
//     let sum = 0;
//     for (let i = 0; i < isbn.length - 1; i++)
//     {
//         let digit = parseInt(isbn[i], 10);
//         if (i % 2 === 0)
//         {
//             sum += digit;
//         } else
//         {
//             sum += digit * 3;
//         }
//     }
//     let check_digit = (10 - (sum % 10)) % 10;

//     // Compare the check digit with the last digit of the ISBN
//     return check_digit === parseInt(isbn[isbn.length - 1], 10);
// }


export const is_valid_ISBN = (isbn) =>
{
    // Remove hyphens and spaces from the ISBN
    isbn = isbn.replace(/[- ]/g, '');

    // Check if the ISBN has 10 or 13 digits
    if (isbn.length !== 10 && isbn.length !== 13)
    {
        return false;
    }

    // Check if the ISBN is valid
    if (isbn.length === 10)
    {
        let sum = 0;
        for (let i = 0; i < 9; i++)
        {
            sum += parseInt(isbn[i], 10) * (10 - i);
        }
        let check_digit = (11 - (sum % 11)) % 11;
        return check_digit === parseInt(isbn[9], 10);
    } else if (isbn.length === 13)
    {
        let sum = 0;
        for (let i = 0; i < 12; i++)
        {
            sum += parseInt(isbn[i], 10) * (i % 2 === 0 ? 1 : 3);
        }
        let check_digit = (10 - (sum % 10)) % 10;
        return check_digit === parseInt(isbn[12], 10);
    }
};