import ErrorBoundaryScreen from "@core/ui/reporter/components/ErrorBoundaryScreen";
import { after } from "@lib/api/patcher";
import { _lazyContextSymbol } from "@metro/lazy";
import { findByFilePathLazy, findByNameLazy, findByPropsLazy } from "@metro/wrappers";

export default function patchErrorBoundary() {
    const hookProto = (exp: any) => {
        if (!exp) return;
        const comp = exp.default ?? exp;
        const proto = comp.prototype ?? comp;
        if (proto.render && !proto.__zencord_screen_hooked) {
            proto.__zencord_screen_hooked = true;
            after("render", proto, function (this: any, _, ret) {
                if (this.state?.error) {
                    const ebErr = this.state.error;
                    console.error("[ZenCord ErrorBoundary]", ebErr);
                    try {
                        alert("ZenCord Component Crash:\n" + (ebErr?.stack || ebErr?.message || String(ebErr)).slice(0, 500));
                    } catch {}

                    return <ErrorBoundaryScreen
                        error={this.state.error}
                        rerender={() => this.setState({ info: null, error: null })}
                    />;
                }
                return ret;
            });
        }
    };

    findByPropsLazy("getDerivedStateFromError")[_lazyContextSymbol]?.getExports(hookProto);
    findByNameLazy("ErrorBoundary", false)[_lazyContextSymbol]?.getExports(hookProto);
    findByFilePathLazy("components_native/ErrorBoundary.tsx", true)[_lazyContextSymbol]?.getExports(hookProto);
}
