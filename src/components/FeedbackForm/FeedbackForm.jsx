import { useState } from "react"
import { leaveFeedback } from "utils/firebase"

export const FeedbackForm = () => {
    const [images, setImage] = useState([])
    
    const onChooseFile = (e) => {
        const files = Object.values(e.target.files)
        console.log(files)

        files.forEach(file => {
            const reader = new FileReader()
            reader.readAsDataURL(file)

            reader.onload = () => {
              console.log(reader.result);
              setImage(prev => [...prev, reader.result])
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
                <input type="file" name='photos' multiple onChange={(e) => onChooseFile(e)}/>
                <div>
                    <ul>
                        {images.map((image, index) => <li key={index}><img src={image}/></li>)}
                    </ul>
                </div>
                <button type="submit">Send feedback</button>
            </form>
        </div>
    )
}