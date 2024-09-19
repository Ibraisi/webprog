import { v4 as uuidv4 } from 'uuid';
import inventory from '../inventory.mjs';

class Salad {
    static instanceCounter = 0;
    #id;

    constructor(salad) {
        this.foundation = '';
        this.protein = '';
        this.dressing = '';
        this.extras = {};
        this.uuid = uuidv4();

        if (salad instanceof Salad) {
            this.foundation = salad.foundation;
            this.protein = salad.protein;
            this.dressing = salad.dressing;
            this.extras = { ...salad.extras };
            this.uuid = uuidv4();
        } else if (typeof salad === 'object' && salad !== null) {
            this.foundation = salad.foundation || '';
            this.protein = salad.protein || '';
            this.dressing = salad.dressing || '';
            this.extras = { ...salad.extras } || {};
            this.uuid = salad.uuid || uuidv4();
        }

        this.#id = 'salad_' + Salad.instanceCounter++;
    }

    setFoundation(foundation) {
        if (inventory[foundation] && inventory[foundation].foundation) {
            this.foundation = foundation;
        }
        return this;
    }

    setProtein(protein) {
        if (inventory[protein] && inventory[protein].protein) {
            this.protein = protein;
        }
        return this;
    }

    setDressing(dressing) {
        if (inventory[dressing] && inventory[dressing].dressing) {
            this.dressing = dressing;
        }
        return this;
    }

    addExtra(extra) {
        if (inventory[extra] && inventory[extra].extra) {
            this.extras[extra] = inventory[extra];
        }
        return this;
    }

    removeExtra(extra) {
        delete this.extras[extra];
        return this;
    }

    static parse(json) {
        const parsed = JSON.parse(json);
        if (Array.isArray(parsed)) {
            return parsed.map(salad => new Salad(salad));
        } else {
            return new Salad(parsed);
        }
    }

    getPrice() {
        let price = 0;
        if (this.foundation) price += inventory[this.foundation].price;
        if (this.protein) price += inventory[this.protein].price;
        if (this.dressing) price += inventory[this.dressing].price;
        price += Object.values(this.extras).reduce((acc, curr) => acc + curr.price, 0);
        return price;
    }

    count(prop) {
        let count = 0;
        if (this.foundation && inventory[this.foundation][prop]) count++;
        if (this.protein && inventory[this.protein][prop]) count++;
        if (this.dressing && inventory[this.dressing][prop]) count++;
        count += Object.values(this.extras).filter(extra => extra[prop]).length;
        return count;
    }
}

export default Salad;
