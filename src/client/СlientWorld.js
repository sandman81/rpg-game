class СlientWorld {
    constructor(game, engine, levelCfg) {
        Object.assign(this, {
            game,
            engine,
            levelCfg,
            height: levelCfg.map.length,
            width: levelCfg.map[0].length,
        });
    }

    init() {
        this.engine.renderSpriteFrame({
            sprite: ['terrain', 'grass'],
            frame: 0,
            x: 0,
            y: 0,
            w: 48,
            h: 48,
        });

        const { map } = this.levelCfg;
        map.forEach((cfgRow, y) => {
            cfgRow.forEach((cfgCell, x) => {
                this.engine.renderSpriteFrame({
                    sprite: ['terrain', cfgCell[0]],
                    frame: 0,
                    x: x * 48,
                    y: y * 48,
                    w: 48,
                    h: 48,
                });
            });
        });
    }
}

export default СlientWorld;
