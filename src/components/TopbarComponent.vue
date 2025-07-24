<!-- TopbarComponent.vue -->
<template>
    <div class="topbar">
      <div class="user-avatar" v-if="initial">
        <div class="avatar-wrapper" @mouseover="showTooltip = true" @mouseleave="showTooltip = false">
          <div class="avatar-circle" :style="{ backgroundColor: randomColor }">
            {{ initial }}
          </div>
          <div class="tooltip" v-if="showTooltip">
            {{ userName }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { auth, db } from "../firebase";
  import { onAuthStateChanged } from "firebase/auth";
  import { ref, query, orderByChild, equalTo, get } from "firebase/database";
  
  export default {
    name: "TopbarComponent",
    data() {
      return {
        initial: "",
        userName: "",
        randomColor: "",
        showTooltip: false
      };
    },
    created() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userQuery = query(
            ref(db, "users"),
            orderByChild("uid"),
            equalTo(user.uid)
          );
          get(userQuery).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const userData = Object.values(data)[0];
              this.userName = userData.name;
              this.initial = userData.name.charAt(0).toUpperCase();
              this.randomColor = this.getRandomColor();
            }
          });
        }
      });
    },
    methods: {
      getRandomColor() {
        let color = "#";
        const letters = "0123456789ABCDEF";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    }
  };
  </script>
  
  <style scoped>
  .topbar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #F6F6F6;
    padding: 10px 20px;
    position: relative;
  }
  
  /* Avatar Styles */
  .avatar-wrapper {
    position: relative;
    display: inline-block;
  }
  
  .avatar-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.2em;
    transition: transform 0.2s;
  }
  
  .tooltip {
    position: absolute;
    bottom: -35px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.75);
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    white-space: nowrap;
    font-size: 0.9em;
    opacity: 0.9;
    pointer-events: none;
    transition: all 0.2s;
  }
  
  /* Responsive Styles */
  @media (max-width: 1024px) {
    .topbar {
      padding: 8px 15px;
    }
    .avatar-circle {
      width: 35px;
      height: 35px;
      font-size: 1em;
    }
    .tooltip {
      font-size: 0.8em;
      bottom: -30px;
    }
  }
  
  @media (max-width: 768px) {
    .topbar {
      padding: 6px 10px;
    }
    .avatar-circle {
      width: 30px;
      height: 30px;
      font-size: 0.9em;
    }
    .tooltip {
      font-size: 0.75em;
      bottom: -28px;
    }
  }
  
  @media (max-width: 480px) {
    .topbar {
      padding: 4px 8px;
    }
    .avatar-circle {
      width: 25px;
      height: 25px;
      font-size: 0.8em;
    }
    .tooltip {
      font-size: 0.7em;
      bottom: -25px;
    }
  }
  
  @media (max-width: 375px) {
    .topbar {
      padding: 4px 6px;
    }
    .avatar-circle {
      width: 23px;
      height: 23px;
      font-size: 0.75em;
    }
    .tooltip {
      font-size: 0.65em;
      bottom: -23px;
    }
  }
  </style>
  