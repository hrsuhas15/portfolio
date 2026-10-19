<script setup>
import { computed } from 'vue'

/**
 * Renders a simple box-and-arrow diagram from data:
 * { title, description, conceptual, width, height, nodes: [{ id, label, sublabel?, x, y, tone? }], edges: [{ from, to, label? }] }
 */
const props = defineProps({
  diagram: { type: Object, required: true },
})

const NODE_W = 170
const NODE_H = 56

const nodeById = computed(() => Object.fromEntries(props.diagram.nodes.map((n) => [n.id, n])))

// Connect the closest sides of two boxes: left/right when mostly horizontal, else top/bottom.
const edges = computed(() =>
  props.diagram.edges.map((edge) => {
    const a = nodeById.value[edge.from]
    const b = nodeById.value[edge.to]
    const ax = a.x + NODE_W / 2
    const ay = a.y + NODE_H / 2
    const bx = b.x + NODE_W / 2
    const by = b.y + NODE_H / 2
    let x1, y1, x2, y2
    if (Math.abs(bx - ax) > Math.abs(by - ay)) {
      const dir = Math.sign(bx - ax)
      ;[x1, y1, x2, y2] = [ax + (dir * NODE_W) / 2, ay, bx - (dir * NODE_W) / 2, by]
    } else {
      const dir = Math.sign(by - ay)
      ;[x1, y1, x2, y2] = [ax, ay + (dir * NODE_H) / 2, bx, by - (dir * NODE_H) / 2]
    }
    return { ...edge, x1, y1, x2, y2, mx: (x1 + x2) / 2, my: (y1 + y2) / 2 }
  }),
)

const titleId = computed(() => `diagram-title-${props.diagram.title.replace(/\W+/g, '-').toLowerCase()}`)
</script>

<template>
  <figure class="diagram">
    <div class="scroll">
      <svg
        :viewBox="`0 0 ${diagram.width} ${diagram.height}`"
        role="img"
        :aria-labelledby="titleId"
      >
        <title :id="titleId">{{ diagram.title }}. {{ diagram.description }}</title>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" class="arrow-head" />
          </marker>
        </defs>

        <g v-for="edge in edges" :key="`${edge.from}-${edge.to}`">
          <line :x1="edge.x1" :y1="edge.y1" :x2="edge.x2" :y2="edge.y2" class="edge" marker-end="url(#arrow)" />
          <text v-if="edge.label" :x="edge.mx" :y="edge.my - 6" class="edge-label" text-anchor="middle">{{ edge.label }}</text>
        </g>

        <g v-for="node in diagram.nodes" :key="node.id" :class="['node', node.tone]">
          <rect :x="node.x" :y="node.y" :width="NODE_W" :height="NODE_H" rx="6" />
          <text :x="node.x + NODE_W / 2" :y="node.y + (node.sublabel ? 24 : 33)" text-anchor="middle" class="node-label">{{ node.label }}</text>
          <text v-if="node.sublabel" :x="node.x + NODE_W / 2" :y="node.y + 42" text-anchor="middle" class="node-sublabel">{{ node.sublabel }}</text>
        </g>
      </svg>
    </div>
    <figcaption>
      <span v-if="diagram.conceptual" class="mono badge">Conceptual diagram</span>
      {{ diagram.description }}
    </figcaption>
  </figure>
</template>

<style scoped>
.diagram {
  margin: var(--space-5) 0;
}

/* On narrow screens the diagram keeps a readable size and scrolls inside its own box */
.scroll {
  overflow-x: auto;
  padding: var(--space-4);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

svg {
  width: 100%;
  min-width: 600px;
  height: auto;
}

.edge {
  stroke: var(--text-muted);
  stroke-width: 1.5;
}

.arrow-head {
  fill: var(--text-muted);
}

.edge-label {
  fill: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 11px;
}

.node rect {
  fill: var(--bg-subtle);
  stroke: var(--border-strong);
  stroke-width: 1.5;
}

.node.accent rect {
  stroke: var(--accent);
}

.node.store rect {
  fill: var(--accent-tint);
  stroke: var(--accent);
  stroke-dasharray: 4 3;
}

.node-label {
  fill: var(--text-strong);
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;
}

.node-sublabel {
  fill: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 10.5px;
}

figcaption {
  margin-top: var(--space-3);
  color: var(--text-muted);
  font-size: var(--fz-sm);
}

.badge {
  display: inline-block;
  margin-right: var(--space-2);
  padding: 0 var(--space-2);
  border: 1px solid var(--warning);
  border-radius: var(--radius-sm);
  color: var(--warning);
  font-size: var(--fz-xxs);
}
</style>
