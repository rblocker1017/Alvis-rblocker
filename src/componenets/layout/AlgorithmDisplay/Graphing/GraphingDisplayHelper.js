export function pointValues(circle, type){
    if (circle.start) {
        return "START NODE"
    }
    else if (circle.end && (type !== "Prim" && type !== "Kruskal")) {
        return "END NODE"
    }
    return "";
}