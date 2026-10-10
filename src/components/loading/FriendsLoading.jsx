import {Search} from "lucide-react"

export default function FriendsLoading(){
    return (
        <main>
          <section className="flex flex-col mx-auto w-[98%]">
            <div>
              <h1 className="text-3xl font-bold text-[var(--accent)]">Friends</h1>
            </div>
            <div className="relative w-full mt-6 h-[35px] w-full pl-[8px] bg-[var(--surface)] border border-white/5 border-b-white/15 shadow-[var(--shadow-input)] rounded-md">
              <Search
                size={20}
                className="absolute -translate-y-1/2 top-[50%] right-[15px]"
              />
            </div>
          </section>
          <section className="mt-4">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">Friend Requests</p>
            </div>
            <hr className="mt-2" />
            <div className="py-6">
                  <div
                    className="h-[65px] flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div
                      className="flex items-center gap-3 flex-1 min-w-0"
                    >
                      <div className="w-[55px] h-[55px] rounded-full"></div>
                        <div className="min-w-0 flex-1">
                            <div className="w-[20%] bg-[var(--loading-surface)]"></div>
                            <div className="w-[30%] bg-[var(--loading-surface)]"></div>
                        </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        className="bg-[var(--loading-background)] py-1 px-2 rounded-sm cursor-pointer"
                      >
                        Accept
                      </button>
                      <button
                        className="bg-[var(--loading-background)] py-1 px-2 rounded-sm cursor-pointer"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
            </div>
          </section>
          <section>
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold">Friends</p>
            </div>
            <hr className="mt-2" />
            <div className="flex flex-col gap-4 py-6">
                  <div
                    className="bg-[var(--loading-background)] w-full flex items-center gap-4 px-2 py-2 cursor-pointer rounded-sm"
                  >
                    <div className="w-[55px] h-[55px] bg-[var(--loading-surface)] rounded-full"></div>
                    <div>
                        <div className="w-[20%] h-[10px] border-white/20 bg-[var(--loading-surface)]"></div>
                        <div className="w-[30%] h-[10px] bg-[var(--loading-surface)]"></div>
                     </div>
                  </div>
            </div>
            <div className="mt-4 float-end">
              <button
                className="bg-[var(--accent)] py-1 px-2 rounded-sm cursor-pointer active:scale-95"
              >
                Show All
              </button>
            </div>
          </section>
        </main>
    )
}