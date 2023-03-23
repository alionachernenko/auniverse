import { useState } from "react"
import { leaveFeedback } from "utils/firebase"

export const FeedbackForm = () => {
    const [images, setImage] = useState([])
    
    const onChooseFile = (e) => {
        const files = Object.values(e.target.files)
        console.log(files)

        let filesCoosen = []

        files.forEach(file => {
            const reader = new FileReader()
            reader.readAsDataURL(file)

            reader.onload = () => {
            console.log(reader.result);
            filesCoosen = [...filesCoosen, reader.result]
                
            setImage(filesCoosen)
        };
        })

        
    }

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
                Object.values(e.target.elements.photos.files).forEach(file => {
                    console.log(file)
                    leaveFeedback(file)
                })
            }}>
                <input type="text" />
                <input type="file" name='photos[]' multiple onInput={(e) => onChooseFile(e)}/>
                <div>
                    <ul>
                        {images.map((image, index) => <li key={index}><img src={image} alt='Feedback attachment' /></li>)}
                    </ul>
                </div>
                <button type="submit">Send feedback</button>
            </form>
        </div>
    )
}