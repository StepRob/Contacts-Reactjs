
import imagen from '../assets/contacts.jpg'
export const Index = () => {
    return (
        <div className='flex flex-row justify-center py-10'>
            <p className='text-center font-bold'>
                Página por defecto
                <br />
                <img className='h-96' src={imagen} alt="imagen" />
            </p>
        </div>
    )
}
