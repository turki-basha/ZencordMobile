import { NavigationNative } from "@metro/common";
import { findByPropsLazy } from "@metro/wrappers";
import { ErrorBoundary } from "@ui/components";
import { RowConfig } from "@ui/settings";

const tabsNavigationRef = findByPropsLazy("getRootNavigationRef");

export const CustomPageRenderer = React.memo(() => {
    const navigation = NavigationNative.useNavigation();
    const route = NavigationNative.useRoute();

    const params = route?.params ?? {};
    const { render: PageComponent, ...args } = params;

    React.useEffect(() => {
        try {
            if (args && Object.keys(args).length > 0) {
                navigation?.setOptions?.(args);
            }
        } catch {}
    }, []);

    if (!PageComponent) {
        return <ErrorBoundary><></></ErrorBoundary>;
    }

    return (
        <ErrorBoundary>
            {typeof PageComponent === "function" ? <PageComponent /> : PageComponent}
        </ErrorBoundary>
    );
});

export function wrapOnPress(
    onPress: (() => unknown) | undefined,
    navigation?: any,
    renderPromise?: RowConfig["render"],
    screenOptions?: string | Record<string, any>,
    props?: any,
) {
    return async () => {
        try {
            if (onPress) return void onPress();

            const Component = await renderPromise?.()?.then(m => m.default);
            if (!Component) return;

            if (typeof screenOptions === "string") {
                screenOptions = { title: screenOptions };
            }

            const nav = navigation ?? tabsNavigationRef?.getRootNavigationRef?.();
            if (nav?.navigate) {
                nav.navigate("BUNNY_CUSTOM_PAGE", {
                    ...screenOptions,
                    render: () => <Component {...props} />
                });
            }
        } catch (e) {
            console.error("[ZenCord wrapOnPress Error]", e);
        }
    };
}

