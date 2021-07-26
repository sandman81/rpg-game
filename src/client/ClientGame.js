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
        return new ClientEngine(document.getElementById(this.cfg.tagId), this);
    }

    createWorld() {
        return new clientWolld(this, this.engine, levelCfg);
    }

    getWorld() {
        return this.map;
    }

    initEngine() {
        this.engine.loadSprites(sprites).then(() => {
            this.map.init();
            this.engine.on('render', (_, time) => {
                this.engine.camera.focusAtGameObject(this.player);
                this.map.render(time);
            });
            this.engine.start();
            this.initKeys();
        });
    }

    initKeys() {
        this.engine.input.onKey({
            ArrowLeft: (keydown) => keydown && this.moveByObject(-1, 0, keydown),
            ArrowRight: (keydown) => keydown && this.moveByObject(+1, 0, keydown),
            ArrowUp: (keydown) => keydown && this.moveByObject(0, -1, keydown),
            ArrowDown: (keydown) => keydown && this.moveByObject(0, +1, keydown),
        });
    }

    moveByObject(x, y, keydown) {
        const { player } = this;

        if (keydown && player.motionProgress === 1) {
            const canMove = player.moveByCellCoord(x, y, (cell) => {
                return cell.findObjectsByType('grass').length;
            });

            if (canMove) {
                player.setState(x, y, keydown);
                player.once('motion-stopped', () => player.setState('main'));
            }
        }
    }

    static init(cfg) {
        if (!ClientGame.game) {
            ClientGame.game = new ClientGame(cfg);
        }
    }
}

export default ClientGame;
