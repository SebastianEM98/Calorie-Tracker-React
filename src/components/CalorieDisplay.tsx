
type CalorieDisplay = {
    calories: number,
    text: string
}

export default function CalorieDisplay({calories, text}: CalorieDisplay) {
    return (
        <p className={`${text === 'Consumed' ? 'text-orange-500' : text === 'Burned' ? 'text-lime-500' : 'text-white'} font-bold rounded-full grid grid-cols-1 gap-3 text-center text-xl`}>
            <span className={`font-black sm:text-6xl text-5xl`}>{calories}</span>
            {text}
        </p>
    )
}
