import ClientEngine from './ClientEngine';
import clientWolld from './СlientWorld';

import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json';
import gameObjects from '../configs/gameObjects.json';

class ClientGame {
    constructor(cfg) {
        Object.assign(this, {
            cfg,
            gameObjects,
            player: null,
        });

        this.engine = this.createEngine();
        this.map = this.createWorld();
        this.initEngine();
    }

    setPlayer(player) {
        this.player = player;
    }

    createEngine() {
        return new ClientEngine(document.getElementById(this.cfg.tagId));
    }

    createWorld() {
        return new clientWolld(this, this.engine, levelCfg);
    }

    initEngine() {
        this.engine.loadSprites(sprites).then(() => {
            this.map.init();
            this.engine.on('render', (_, time) => {
                this.map.render(time);
            });
            this.engine.start();
            this.initKeys();
        });
    }

    initKeys() {
        this.engine.input.onKey({
            ArrowLeft: (keydown) => this.moveByObject(-1, 0, keydown),
            ArrowRight: (keydown) => this.moveByObject(+1, 0, keydown),
            ArrowUp: (keydown) => this.moveByObject(0, -1, keydown),
            ArrowDown: (keydown) => this.moveByObject(0, +1, keydown)
        });
    }

    moveByObject(x, y, keydown) {
        if (keydown) {
            this.player.moveByCellCoord(x, y, (cell) => {
                return cell.findObjectsByType('grass').length;
            });
        }
    }

    static init(cfg) {
        if (!ClientGame.game) {
            ClientGame.game = new ClientGame(cfg);
        }
    }
}

export default ClientGame;
