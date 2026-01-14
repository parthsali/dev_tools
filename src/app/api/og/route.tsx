import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const runtime = 'edge';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        // ?title=<title>
        const hasTitle = searchParams.has('title');
        const title = hasTitle
            ? searchParams.get('title')?.slice(0, 100)
            : siteConfig.name;

        // ?description=<description>
        const hasDescription = searchParams.has('description');
        const description = hasDescription
            ? searchParams.get('description')?.slice(0, 200)
            : siteConfig.description;

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundImage: 'linear-gradient(to bottom right, #000000, #1a1a1a)',
                        color: 'white',
                        fontFamily: 'Inter, sans-serif',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            padding: '40px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '20px',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                        }}
                    >
                        <div
                            style={{
                                fontSize: 60,
                                fontWeight: 900,
                                background: 'linear-gradient(to right, #fff, #888)',
                                backgroundClip: 'text',
                                color: 'transparent',
                                marginBottom: 20,
                            }}
                        >
                            {title}
                        </div>
                        <div
                            style={{
                                fontSize: 24,
                                color: '#aaa',
                                maxWidth: 800,
                                lineHeight: 1.4,
                            }}
                        >
                            {description}
                        </div>
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 40,
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: 20,
                            color: '#666',
                        }}
                    >
                        {siteConfig.url.replace(/^https?:\/\//, '')}
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
