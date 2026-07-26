export function matchIdRoute(url: string, basePath: string): number | null {
    const regex = new RegExp(`^${basePath}/(\\d+)$`);
    const match = url.match(regex);
    return match ? Number(match[1]) : null;
}