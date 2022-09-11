import type { Entity } from "../Entity/index.js"

export type ScoreboardEntity = {
    entity: Entity | string
    score: number
}

export type DisplaySlot = "sidebar" | "list" | "actionbar"