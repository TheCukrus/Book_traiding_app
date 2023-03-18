
export const convert_photo_to_string = (set_input_form, param, name) =>
{
    const file_reader_1 = new FileReader();

    file_reader_1.addEventListener("loadend", () =>
    {
        set_input_form((prev_states) => (
            {
                ...prev_states,
                [name]: file_reader_1.result
            }));
    });

    file_reader_1.addEventListener("error", (err) =>
    {
        console.log(`Error reading file: ${err}`)
    })

    file_reader_1.readAsDataURL(param)
}