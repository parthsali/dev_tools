import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DummyApiClient from '@/app/tools/dummy-api/client';

// Mock ToolLayout
jest.mock("@/components/tools/tool-layout", () => ({
    ToolLayout: ({ children, title, description }: any) => (
        <div data-testid="tool-layout">
            <h1>{title}</h1>
            <p>{description}</p>
            {children}
        </div>
    ),
    CopyButton: () => <button>Copy</button>,
}));

// Mock UI components
jest.mock("@/components/ui/card", () => ({
    Card: ({ children, className }: any) => <div className={className}>{children}</div>,
    CardHeader: ({ children }: any) => <div>{children}</div>,
    CardTitle: ({ children }: any) => <h3>{children}</h3>,
    CardDescription: ({ children }: any) => <p>{children}</p>,
    CardContent: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("@/components/ui/badge", () => ({
    Badge: ({ children }: any) => <span>{children}</span>,
}));

jest.mock("@/components/ui/button", () => ({
    Button: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
}));

jest.mock("@/components/ui/separator", () => ({
    Separator: () => <hr />,
}));

jest.mock("@/components/ui/select", () => ({
    Select: ({ children, value, onValueChange }: any) => (
        <div data-testid="select" data-value={value} onClick={() => onValueChange && onValueChange('python')}>
            {children}
        </div>
    ),
    SelectTrigger: ({ children }: any) => <button>{children}</button>,
    SelectValue: () => <span>Select Value</span>,
    SelectContent: ({ children }: any) => <div>{children}</div>,
    SelectItem: ({ children, value }: any) => <div data-value={value}>{children}</div>,
}));

// Mock clipboard API
const mockWriteText = jest.fn();
Object.assign(navigator, {
    clipboard: {
        writeText: mockWriteText,
    },
});

// Mock Prism React Renderer to avoid issues with complexity in tests
jest.mock("prism-react-renderer", () => ({
    Highlight: ({ children, code, language }: any) => {
        return children({
            className: "mock-prism",
            style: {},
            tokens: [[{ content: code }]],
            getLineProps: () => ({}),
            getTokenProps: ({ token }: any) => ({ children: token.content }),
        });
    },
    themes: {
        oneDark: {},
    },
}));

// Mock Lucide icons
jest.mock("lucide-react", () => ({
    Users: () => <span data-testid="icon-users" />,
    FileText: () => <span data-testid="icon-file-text" />,
    ShoppingBag: () => <span data-testid="icon-shopping-bag" />,
    CheckSquare: () => <span data-testid="icon-check-square" />,
    MessageCircle: () => <span data-testid="icon-message-circle" />,
    ShoppingCart: () => <span data-testid="icon-shopping-cart" />,
    Building2: () => <span data-testid="icon-building-2" />,
    Quote: () => <span data-testid="icon-quote" />,
    Play: () => <span data-testid="icon-play" />,
    Copy: () => <span data-testid="icon-copy" />,
    Check: () => <span data-testid="icon-check" />,
    ExternalLink: () => <span data-testid="icon-external-link" />,
    Zap: () => <span data-testid="icon-zap" />,
    Globe: () => <span data-testid="icon-globe" />,
    Code2: () => <span data-testid="icon-code-2" />,
    Database: () => <span data-testid="icon-database" />,
    ChevronRight: () => <span data-testid="icon-chevron-right" />,
    Loader2: () => <span data-testid="icon-loader-2" />,
    ChevronDown: () => <span data-testid="icon-chevron-down" />,
}));

// Mock useRouter
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
    }),
    usePathname: () => "/tools/dummy-api",
}));

describe('DummyApiClient', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    it('renders the main title and description', () => {
        render(<DummyApiClient />);
        expect(screen.getByText('Mock REST API')).toBeInTheDocument();
        expect(screen.getByText(/DevTools Mock REST API/i)).toBeInTheDocument();
    });

    it('renders the Quick Start section', () => {
        render(<DummyApiClient />);
        expect(screen.getByText('Quick Start')).toBeInTheDocument();
        expect(screen.getByText('Fetch data in seconds. Select your language and copy the code.')).toBeInTheDocument();
    });

    it('shows the correct default code snippet for JavaScript', () => {
        render(<DummyApiClient />);
        // Checking for a part of the JS snippet
        expect(screen.getByText(/const response = await fetch/)).toBeInTheDocument();
    });

    it('allows changing the language', async () => {
        render(<DummyApiClient />);

        // Find the select trigger (using the mock's data-testid)
        const select = screen.getByTestId('select');

        // Click the select to trigger onValueChange (as mandated by our mock)
        fireEvent.click(select);

        // Check if localStorage was updated
        expect(localStorage.getItem('devtools-api-language')).toBe('python');

        // Check if code snippet updated to Python
        await waitFor(() => {
            expect(screen.getByText(/import requests/)).toBeInTheDocument();
        });
    });

    it('copies code to clipboard', async () => {
        render(<DummyApiClient />);

        // Find the copy button in Quick Start
        // Since we mocked Button as <button>, we can find by text
        const copyButtons = screen.getAllByText('Copy Code');
        const mainCopyButton = copyButtons[0];

        fireEvent.click(mainCopyButton);

        await waitFor(() => {
            expect(mockWriteText).toHaveBeenCalled();
            expect(screen.getByText('Copied!')).toBeInTheDocument();
        });
    });

    it('displays API resources', () => {
        render(<DummyApiClient />);

        // Check for resource tabs (mocked as buttons)
        // Using getAllByText since "Users" appears in both tab and content title
        expect(screen.getAllByText('Users').length).toBeGreaterThan(0);
        expect(screen.getByText('Posts')).toBeInTheDocument();
        expect(screen.getByText('Quotes')).toBeInTheDocument();
    });

    it('switches resources when clicked', () => {
        render(<DummyApiClient />);

        // Find the generic "Quotes" text - usually works if it's in the button
        const quotesButton = screen.getAllByText('Quotes').find(el => el.tagName === 'BUTTON') || screen.getByText('Quotes');
        fireEvent.click(quotesButton);

        // Should show quotes specific content
        expect(screen.getByText('200 verified inspirational quotes from famous personalities')).toBeInTheDocument();
        // Since we mocked the endpoint card content effectively, we look for text that appears in the card
        expect(screen.getByText('/api/quotes/random')).toBeInTheDocument();
    });
});
