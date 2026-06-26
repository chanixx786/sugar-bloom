export default function LandingLayout({children}: Readonly<{children: React.ReactNode}>){
    return (
        <div>
            <main>
                {children}
            </main>
        </div>
    )
}