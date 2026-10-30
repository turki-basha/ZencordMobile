import ErrorBoundaryScreen from "@core/ui/reporter/components/ErrorBoundaryScreen";
import { after } from "@lib/api/patcher";
import { _lazyContextSymbol } from "@metro/lazy";
import { LazyModuleContext } from "@metro/types";
import { findByNameLazy } from "@metro/wrappers";

function getErrorBoundaryContext() {
    const ctxt: LazyModuleContext = findByNameLazy("ErrorBoundary")[_lazyContextSymbol];
    return new Promise(resolve => ctxt.getExports(exp => resolve(exp.prototype)));
}

export default function patchErrorBoundary() {
    return after.await("render", getErrorBoundaryContext(), function (this: any) {
        if (!this.state.error) return;
        const ebErr = this.state.error;
        console.error("[ZenCord ErrorBoundary]", ebErr);
        try {
            alert("ZenCord Component Crash:\n" + (ebErr?.stack || ebErr?.message || String(ebErr)).slice(0, 400));
        } catch {}

        return <ErrorBoundaryScreen
            error={this.state.error}
            rerender={() => this.setState({ info: null, error: null })}
        />;
    });
}
