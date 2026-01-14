import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { tools } from '@/config/tools';
import { guides } from '@/config/guides';

export default function sitemap(): MetadataRoute.Sitemap {
    const toolUrls = tools.map((tool) => ({
        url: `${siteConfig.url}${tool.href}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const guideUrls = guides.map((guide) => ({
        url: `${siteConfig.url}/guides/${guide.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: siteConfig.url,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${siteConfig.url}/guides`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...toolUrls,
        ...guideUrls,
    ];
}
