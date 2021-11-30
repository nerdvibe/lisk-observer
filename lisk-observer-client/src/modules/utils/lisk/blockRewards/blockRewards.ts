/*
 * Copyright © 2018 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 */
import { Big } from "big.js";
import { configs, Config } from "./config";

// distance, rewardOffset, milestones, totalAmount,

class BlockReewards {
  config: Config;

  constructor(project: "lisk", network: "mainnet" | "testnet") {
    this.config = configs[project][network];
  }

  /**
   * Returns absolute value from number.
   *
   * @private
   * @param {number} height
   * @returns {number}
   * @throws If block height invalid
   * @todo Add description for the params and the return value
   */
  public parseHeight(height: number) {
    if (
      typeof height === "undefined" ||
      height === null ||
      Number.isNaN(height)
    ) {
      throw new TypeError("Invalid block height");
    } else {
      return Math.abs(height);
    }
  }

  /**
   * Description of the function.
   *
   * @param {number} height
   * @returns {number}
   * @todo Add description for the function, params and the return value
   */
  public calculateMilestone(height: number) {
    const parsedHeight = this.parseHeight(height);
    const distance = Math.floor(this.config.DISTANCE);

    const location = Math.trunc((parsedHeight - this.config.OFFSET) / distance);
    const lastMile = this.config.MILESTONES[this.config.MILESTONES.length - 1];

    if (location > this.config.MILESTONES.length - 1) {
      return this.config.MILESTONES.lastIndexOf(lastMile);
    }
    return location;
  }

  /**
   * Description of the function.
   *
   * @param {number} height
   * @returns {Bignumber}
   * @todo Add description for the function, params and the return value
   */
  public calculateReward(height: number) {
    const parsedHeight = this.parseHeight(height);

    if (parsedHeight < this.config.OFFSET) {
      return new Big(0);
    }
    return new Big(
      this.config.MILESTONES[this.calculateMilestone(parsedHeight)]
    );
  }

  /**
   * Description of the function.
   *
   * @param {number} height
   * @returns {Bignumber}
   * @todo Add description for the function, params and the return value
   */
  public calculateSupply(height: number) {
    let parsedHeight = this.parseHeight(height);
    const distance = Math.floor(this.config.DISTANCE);
    let supply = new Big(this.config.TOTAL_AMOUNT);

    if (parsedHeight < this.config.OFFSET) {
      // Rewards not started yet
      return supply;
    }

    const milestone = this.calculateMilestone(parsedHeight);
    const rewards = [];

    let amount = 0;
    let multiplier = 0;

    // Remove offset from height
    parsedHeight -= this.config.OFFSET - 1;

    for (let i = 0; i < this.config.MILESTONES.length; i++) {
      if (milestone >= i) {
        multiplier = +this.config.MILESTONES[i];

        if (parsedHeight < distance) {
          // Measure distance thus far
          amount = parsedHeight % distance;
        } else {
          amount = distance; // Assign completed milestone
          parsedHeight -= distance; // Deduct from total height

          // After last milestone
          if (parsedHeight > 0 && i === this.config.MILESTONES.length - 1) {
            amount += height;
          }
        }

        rewards.push([amount, multiplier]);
      } else {
        break; // Milestone out of bounds
      }
    }

    for (let i = 0; i < rewards.length; i++) {
      const reward = rewards[i];
      supply = supply.plus(new Big(reward[0]).mul(reward[1]));
    }

    return supply;
  }
}

export const liskTestnetBlockRewards = new BlockReewards("lisk", "testnet");
export const liskMainnetBlockRewards = new BlockReewards("lisk", "mainnet");
