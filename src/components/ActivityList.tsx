import { useMemo, type Dispatch } from "react"
import type { Activity } from "../types"
import { categories } from "../data/categories"
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import type { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({ activities, dispatch }: ActivityListProps) {

    const categoryName = useMemo(() =>
        (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
    , [activities])

    const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

    return (
        <>
            <h2 className="sm:text-4xl text-3xl font-bold text-slate-600 text-center mb-10">Food & Activities</h2>

            {isEmptyActivities ?
                <p className="text-center text-lg">There are no activities yet...</p>
                :
                activities.map(activity => (
                    <div key={activity.id} className="px-5 py-10 sm:pb-10 pb-8 bg-white mt-5 flex justify-between shadow-md">
                        <div className="space-y-2 relative">
                            <p className={`absolute -top-8 -left-8 px-10 py-2 sm:text-base text-sm text-white uppercase font-bold ${activity.category === 1 ? "bg-orange-500" : "bg-lime-500"}`}>
                                {categoryName(+activity.category)}
                            </p>

                            <p className="sm:text-2xl text-xl font-bold pt-5">{activity.name}</p>
                            <p className={`font-black sm:text-4xl text-2xl ${activity.category === 1 ? "text-orange-500" : "text-lime-500"}`}>
                                {activity.calories} {''}
                                <span>Calories</span>
                            </p>
                        </div>

                        <div className="flex sm:gap-5 gap-3 items-center">
                            <button
                                className="cursor-pointer transition-transform duration-300 hover:scale-125 active:scale-105"
                                onClick={() => dispatch({ type: 'set-activeId', payload: { id: activity.id } })}
                            >
                                <PencilSquareIcon
                                    className="h-8 w-8 text-gray-800"
                                />
                            </button>

                            <button
                                className="cursor-pointer transition-transform duration-300 hover:scale-125 active:scale-105"
                                onClick={() => dispatch({ type: 'delete-activity', payload: { id: activity.id } })}
                            >
                                <XCircleIcon
                                    className="h-9 w-9 text-red-500"
                                />
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
