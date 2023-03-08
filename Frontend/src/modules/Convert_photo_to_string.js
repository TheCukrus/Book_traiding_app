const convert_photo_to_string = (file) =>
{
    return new Promise((resolve, reject) =>
    {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default convert_photo_to_string;