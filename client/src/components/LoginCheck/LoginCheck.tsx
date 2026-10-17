export function LoginCheck({ title = '로그인 상태를 확인하고 있어요', description = '잠시만 기다려 주세요.' }: {title?: string, description?: string}) {
    return (
        <div
            role="status"
            className="flex min-h-screen flex-col items-center justify-center bg-[#0c0d10] px-6"
        >
            <div className="relative mb-8 flex h-16 w-16 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-red-500/10" />
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-red-500 border-r-red-500/30" />
                <div className="h-9 w-9 rounded-full bg-red-500/10 blur-sm" />
                <span className="absolute text-xl font-bold tracking-tight text-red-500">
                    C
                </span>
            </div>

            <h2 className="text-base font-semibold tracking-tight text-zinc-100">
                {title}
            </h2>

            <p className="mt-2 text-center text-xs text-zinc-500">
               {description}
            </p>

            <div className="mt-7 flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500/70"
                        style={{ animationDelay: `${i * 200}ms` }}
                    />
                ))}
            </div>
        </div>
    )
}