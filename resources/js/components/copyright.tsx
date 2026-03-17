// import TextLink from '@/components/text-link';
export default function Copyright() {
    return (
        <footer className="mt-auto py-6 border-t">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-muted-foreground">
                <p>© {import.meta.env.VITE_APP_NAME || 'Laravel'} {new Date().getFullYear()}. All rights reserved.</p>

                {/* <div className="flex gap-6">
                    <TextLink href="/terms" className="hover:text-primary">Terms</TextLink>
                    <TextLink href="/privacy" className="hover:text-primary">Privacy</TextLink>
                    <TextLink href="/contact" className="hover:text-primary">Contact</TextLink>
                </div> */}
            </div>
        </footer>
    );
}